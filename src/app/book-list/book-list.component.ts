import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BookService } from '../service/book.service';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, ScrollingModule, FormsModule, InfiniteScrollModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  Books: any = [];
  selectBook: any = [];
  filterBooks: any;
  isLoading = false;
  currentPage = 1;
  backgroundColor: string = 'white';
  toggleLoading = () => this.isLoading = !this.isLoading;
  constructor(private service: BookService) { }
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.service.getAllBook(this.currentPage).subscribe(
      (res: any) => {
        if (res) {
          this.Books = res.docs;
          this.filterBooks = this.Books;
          console.log(this.Books);
        } else {
          console.error('No data received');
        }
      },
      (error: any) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  appendData = () => {
    this.toggleLoading();
    this.service.getAllBook(this.currentPage).subscribe({
      next: response => this.Books = [...this.Books, ...response]
    });
  }
  onScroll = () => {
    this.currentPage++;
    this.appendData();
  }
  _keyword: string = '';

  get keyword(): string {
    return this._keyword;
  }
  set keyword(value: string) {
    this._keyword = value;
    var filterBy = this._keyword.toLocaleLowerCase()
    this.filterBooks = this.Books.filter((book: any) =>
      book.title.toLocaleLowerCase().includes(filterBy)
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  changeback(color: string) { 
    this.backgroundColor = color;
   }
}