import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewHeroComponent } from './new-hero.component';

describe('NewHeroComponent', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
