import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarRecipeComponent } from './search-bar-recipe.component';

describe('SearchBarRecipeComponent', () => {
  let component: SearchBarRecipeComponent;
  let fixture: ComponentFixture<SearchBarRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchBarRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
