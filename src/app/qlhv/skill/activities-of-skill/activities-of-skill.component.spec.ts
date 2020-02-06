import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesOfSkillComponent } from './activities-of-skill.component';

describe('ActivitiesOfSkillComponent', () => {
  let component: ActivitiesOfSkillComponent;
  let fixture: ComponentFixture<ActivitiesOfSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesOfSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesOfSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
