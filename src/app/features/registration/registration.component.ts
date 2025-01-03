import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  type OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FirestoreService } from '../../service/firestore.service';
import { Registration } from '../../model/global.model';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,

    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit, AfterViewInit {
  #fb = inject(FormBuilder);
  #firestoreService = inject(FirestoreService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formGroup: FormGroup;
  displayedColumns: string[] = ['no', 'name', 'family'];
  dataSource = new MatTableDataSource<Registration>();
  num = signal(0);

  constructor() {
    this.formGroup = this.#fb.group({
      no: [undefined],
      name: ['', Validators.required],
      family: '',
    });
  }

  ngOnInit(): void {
    this.#firestoreService.registration.subscribe(v=>{
      this.num.set(v.length+1);
      this.dataSource.data = v;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async save() {
    console.log('formGroup', this.formGroup.value);
    if (this.formGroup.valid) {
      try {
        const val = this.formGroup.value;
        val.no = this.num();
        await this.#firestoreService
          .addRegistration(val)
          .then((v) => {
            console.log('save')
          });
        this.formGroup.reset(); // Clear the form
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }
}