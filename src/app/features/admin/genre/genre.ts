import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IGenre } from '../../../core/interfaces/genre.interface';
import { GenreService } from '../../../core/services/genre.service';

@Component({
    selector: 'app-genre',
    imports: [CardModule, TableModule, PanelModule, ButtonModule, ReactiveFormsModule, InputTextModule, ToastModule],
    templateUrl: './genre.html',
    styleUrl: './genre.scss',
    providers: [MessageService],
})
export class Genre implements OnInit {
    genreForm: FormGroup;
    genres: IGenre[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly genreService: GenreService,
        private readonly messageService: MessageService,
        private readonly cdr: ChangeDetectorRef
    ) {
        this.genreForm = this.fb.group({
            genreShortname: ['', [Validators.required, Validators.maxLength(1)]],
            genreName: ['', [Validators.required, Validators.maxLength(20)]],
        });
    }

    ngOnInit(): void {
        this.genreService.getAll().subscribe({
            next: (data) => {
                if (data) {
                    this.genres = data;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Error al cargar genres:', err);
            },
        });
    }

    addGenre(): void {
        const genreName = this.genreForm.get('genreName')?.value?.trim();
        const genreShortname = this.genreForm.get('genreShortname')?.value?.trim();

        if (!genreName || genreName.length < 2 || genreName.length > 20 || !/^[a-zA-Z]+$/.test(genreName)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'The genre name is invalid'
            });
            return;
        }

        if (!genreShortname?.length || genreShortname.length !== 1 || !/^[a-zA-Z]$/.test(genreShortname)) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'The genre shortname is invalid'
            });
            return;
        }

        this.genreService.createGenre(genreShortname, genreName).subscribe({
            next: (response) => {
                console.log('Genre creado exitosamente:', response);
            },
            error: (err) => {
                console.error('Error al crear género:', err);
            }
        });
    }

    clearForm(): void {
        console.log('Clearing form');
        this.genreForm.reset();
    }
}
