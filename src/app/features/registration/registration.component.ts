import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  type OnInit,
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DummyData } from '../../model/global.model';
import { FirestoreService } from '../../service/firestore.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

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
  displayedColumns: string[] = ['no', 'name', 'cpNo'];
  dataSource = new MatTableDataSource<Registration>();

  constructor() {
    this.formGroup = this.#fb.group({
      no: [undefined, Validators.required],
      name: ['', Validators.required],
      cpNo: '',
    });
  }

  ngOnInit(): void {
    this.#firestoreService.registration.subscribe(v=>{
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
        await this.#firestoreService
          .addRegistration(this.formGroup.value)
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

export interface Registration {
  no: number;
  name: string;
  cpNo: string;
}
