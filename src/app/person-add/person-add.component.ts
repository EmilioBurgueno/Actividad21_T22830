import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../person.service';
import { Router } from '@angular/router';
import { Person } from 'src/models/person.model';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.sass']
})
export class PersonAddComponent implements OnInit {

  personForm: FormGroup;
  persons: Person[];

  constructor(private personService: PersonService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.personForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl('https://www.kindpng.com/picc/m/111-1114911_person-icon-png-download-icono-usuario-png-transparent.png')
    }
    );
  }

  getPersons() {
    this.personService.getPersons().then((persons) => {
      this.persons = persons;
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      const newPerson: Person = {
        ...this.personForm.value
      };
      this.personService.addPerson(newPerson).then((result) => {
        this.router.navigate(['']);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('Tu forma no esta completa');
    }
  }
}
