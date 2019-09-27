import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  imgSrc: any;
  multipleImages: any[];
  userFullName: string;
  @ViewChild('photo', { static: true }) photo: ElementRef;
  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nac: [''],
      photo: []
    });
  }

  ngOnInit(): void {
    this.photo.nativeElement.addEventListener('change', event => {
      /**
       * La primera imagen cargada estará en el header
       */
      this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(event.target.files[0])
      );
      if (event.target.files.length > 1) {
        /**
         * Contenedor temporal de archivos
         */
        const multiplesImages = [];
        /**
         * Iterando los archivos para ser mostrados como colección
         */
        for (let index = 0; index < event.target.files.length; index++) {
          // console.log(index);
          const image = event.target.files[index];
          const imageParsed = this.domSanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(image)
          );
          multiplesImages.push(imageParsed);
          this.multipleImages = multiplesImages;
        }
      }
    });
  }

  get fullName(): string {
    const name = this.form.controls['nombre'].value;
    const lastName = this.form.controls['apellido'].value;
    return `${name} ${lastName}`;
  }
}
