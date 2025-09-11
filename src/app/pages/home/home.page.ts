import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

interface FileData {
  name: string;
  type: string;
  dataUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
  animations: [
    trigger('fadeInUp',[
      state('void',style({ opacity: 0, transform: 'translateY(20px)' })),
      transition(':enter', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class HomePage implements OnInit{

  files: FileData[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadFiles();
  }

  loadFiles() {
    const savedFiles = localStorage.getItem('userFiles');
    if (savedFiles) {
      this.files = JSON.parse(savedFiles);
    }
  }

  saveFiles() {
    localStorage.setItem('userFiles',JSON.stringify(this.files));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData: FileData = {
          name: file.name,
          type: file.type,
          dataUrl: reader.result as string
        };
        this.files.push(fileData);
        this.saveFiles();
      };
      reader.readAsDataURL(file);
    }
  }

  deleteFile(index: number) {
    this.files.slice(index, 1);
    this.saveFiles();
  }

  viewFile(file: FileData) {
    window.open(file.dataUrl, '_blank');
  }

  goToProfile() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    this.router.navigate(['/profile']);
  }

  goToNotes() {
    this.router.navigate(['/notes']);
  }

  logout() {
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }
}
