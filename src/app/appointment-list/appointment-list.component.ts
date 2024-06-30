import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent {
  appointments: Appointment[] = []
  ngOnInit(){
    const localStorageAppointments = localStorage.getItem("appointments")
    if(localStorageAppointments !== null){
      this.appointments = JSON.parse(localStorageAppointments)
    }
  }
  title: string = ""
  date: Date = new Date()
  updateAppointments(){
    localStorage.setItem("appointments", JSON.stringify(this.appointments))
  }
  createAppointment(){
    if(!this.title.trim() || !this.date){
      return;
    }
    const appointment:Appointment = {
      id: Math.floor(Math.random()*100000),
      title: this.title,
      date: this.date,
    }
    this.appointments = [appointment,...this.appointments]
    this.title = ""
    this.date = new Date()
    this.updateAppointments()
  }
  deleteAppointment(id: number){
    this.appointments = this.appointments.filter(appointment => appointment.id !== id)
    this.updateAppointments()
  }
}
