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
  selector: 'app-list-registration',
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
  templateUrl: './list-registration.component.html',
  styleUrl: './list-registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListRegistrationComponent implements OnInit {
  #fb = inject(FormBuilder);
  #firestoreService = inject(FirestoreService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  formGroup: FormGroup;
  displayedColumns: string[] = ['no', 'name', 'family'];
  dataSource = new MatTableDataSource<Registration>();

  constructor() {
    this.formGroup = this.#fb.group({
      search: [''],
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Go to the first page after filtering
    }
  }

  generateTxtFile() {
    // Get the filtered data from the dataSource
    const filteredData = this.dataSource.filteredData;

    // Format the data as a string (you can customize this format)
    let dataString = 'Name\r\n'; // Header row with Windows-style line endings
    for (const item of filteredData) {
      dataString += `${item.name}\r\n`; // Data rows with Windows-style line endings
    }

    // Create a Blob from the string
    const blob = new Blob([dataString], { type: 'text/plain' });

    // Create an object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registration_data.txt'; // Set the file name
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
