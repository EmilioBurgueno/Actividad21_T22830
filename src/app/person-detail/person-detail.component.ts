import { Component, OnInit } from '@angular/core';
import { Person } from 'src/models/person.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../person.service';
import { FormControl, FormGroup , Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.sass']
})
export class PersonDetailComponent implements OnInit {

  person: Person;
  display = true;
  display1 = false;
  personForm: FormGroup;
  persons: Person[];

  constructor(private activatedRoute: ActivatedRoute,
              private personService: PersonService,
              private router: Router) { }

  ngOnInit() {
    const personId = this.activatedRoute.snapshot.paramMap.get('personId');
    this.getPerson(personId);
    this.initForm();
    this.getPersons();
  }

  initForm() {
    this.personForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }

  patchForm(){
    this.personForm.patchValue({
      ...this.person
    });
  }

  getPerson(personId: string) {
    this.personService.getPerson(personId).then((person: Person) => {
      this.person = person;
      this.patchForm();
    }).catch((error) => {
      this.router.navigate(['']);
    });
  }

  update() {
    this.display = !this.display;
    this.display1 = !this.display1;
  }

  getPersons() {
    this.personService.getPersons().then((persons) => {
      this.persons = persons;
    });
  }

  onSubmit() {
    if (this.personForm.valid ) {
      const updatedPerson: Person = {
        id : this.person.id,
        ...this.personForm.value
      };
      this.personService.updatePerson(this.person.id, updatedPerson).then((res) => {
        alert('Person updated');
        this.router.navigate(['']);
      }).catch((error) => {
        alert('Ocurrió un error al actulizar tu libro. Vuelvelo a intentar.');
      });
    } else {
      alert('Tu forma no está completa.');
    }
  }

  deletePerson(personId: string) {
    this.personService.deletePerson(personId).then((result) => {
      this.getPersons();
      this.router.navigate(['']);
      alert('Se ha borrado el contacto.');
    }).catch((error) => {

    });
  }

}
