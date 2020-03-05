import { Injectable } from '@angular/core';
import { Person } from '/home/emilio/AngularProjects/Contacts/src/models/person.model';
import { map, find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  persons: Person[] = [{
    id: '1',
    name: 'Juan Perez',
    phone: '(664) 555 77 77',
    email: 'juan.perez@gmail.com',
    imageUrl: 'https://www.kindpng.com/picc/m/111-1114911_person-icon-png-download-icono-usuario-png-transparent.png'
  },
];

  constructor() { }

  getPersons(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      resolve(this.persons);
    });
  }

  addPerson(person: Person): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.persons.push(person);

      resolve(true);
    });
  }

  getPerson(personId: string): Promise<Person> {
    return new Promise((resolve, reject) => {
      const foundPerson = this.persons.find((person) => {
        return person.id === personId;
      });

      if (foundPerson) {
        resolve(foundPerson);
      } else {
        reject('No se encontro la persona!');
      }
    });
  }

  updatePerson(personId: string, updatePerson: Person): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const updatedPersons = this.persons.map((person) => {
        if (person.id === personId) {
          const newPerson = {
            ...person,
            ...updatePerson
          };
          return newPerson;
        }
        return person;
      });

      if (JSON.stringify(updatedPersons) !== JSON.stringify(this.persons)){
        this.persons = updatedPersons;
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  deletePerson(personId: string): Promise<boolean>{
    return new Promise((resolve, reject) => {
      const remainingPersons = this.persons.filter((person) => {
        return person.id !== personId;
      });

      if (JSON.stringify(remainingPersons) !== JSON.stringify(this.persons)) {
        this.persons = remainingPersons;
        resolve(true);
      } else{
        reject('No se borró tu libro');
      }
    });
  }
}
