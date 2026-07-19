import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let fixture: ComponentFixture<Pagination>;
  let component: Pagination;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Pagination] }).compileComponents();
    fixture = TestBed.createComponent(Pagination);
    component = fixture.componentInstance;
  });

  it('calculates the number of pages', () => {
    component.totalItems = 21;
    component.pageSize = 10;
    expect(component.totalPages).toBe(3);
  });

  it('always has at least one page', () => {
    expect(component.totalPages).toBe(1);
  });

  it('emits valid page changes', () => {
    component.totalItems = 30;
    component.currentPage = 2;
    const emit = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(3);
    expect(emit).toHaveBeenCalledWith(3);
  });

  it('does not emit the current or an invalid page', () => {
    component.totalItems = 20;
    const emit = jest.spyOn(component.pageChange, 'emit');
    component.goToPage(1);
    component.goToPage(0);
    component.goToPage(3);
    expect(emit).not.toHaveBeenCalled();
  });

  it('renders controls only for multiple pages', () => {
    component.totalItems = 11;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Page 1 of 2');
  });
});
