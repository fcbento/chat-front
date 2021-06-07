import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from './room.service';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms: any[] = []
  topics: any[] = []
  socket: any

  constructor(private router: Router, public roomService: RoomService) {}

  ngOnInit(): void {
    this.getLanguageRooms()
    this.getTopicRooms()
  }

  //Set flags to the countries
  getCountriesFlag() {
    for (let room of this.rooms) {
      this.roomService.getAllWithUrlParam(environment.API_COUNTRIES, 'rest/v2/name', room.country)
        .subscribe(data => {
          room.flag = data.map(country => country.flag)[0]
        })
    }
  }

  getLanguageRooms() {
    this.roomService.getAll()
      .subscribe(data => {
        this.rooms = data
        this.getCountriesFlag()
      })
  }

  getTopicRooms() {
    this.roomService.getAllWithUrlParam(environment.API_URL, 'room/topics', null)
      .subscribe(data => {
        this.topics = data
      })
  }

  goChat(room) {
    localStorage.setItem('room', JSON.stringify(room))
    this.router.navigateByUrl('/chat')
  }

}