import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: `./heroes.component.html`,
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  heroes: Hero[];
  selectedHero: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
