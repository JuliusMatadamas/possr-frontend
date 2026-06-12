import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IGenre } from '../../../core/interfaces/genre.interface';
import { GenreService } from '../../../core/services/genre.service';

@Component({
    selector: 'app-genre',
    imports: [CardModule, TableModule, PanelModule, ButtonModule, ReactiveFormsModule, InputTextModule],
    templateUrl: './genre.html',
    styleUrl: './genre.scss',
})
export class Genre implements OnInit {
    genreForm: FormGroup;
    genres: IGenre[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly genreService: GenreService
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
                }
            },
            error: (err) => {
                console.error('Error al cargar genres:', err);
            },
        });
    }
}
