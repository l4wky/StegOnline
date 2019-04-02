import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../common-services/image.service';

@Component({
  selector: 'strings-panel',
  templateUrl: './strings.component.html'
})
export class StringsComponent implements OnInit {

  constructor(private imageService: ImageService) { }
	//The two columns of strings
	stringsA: string[];
	stringsB: string[];

  ngOnInit() {
		//If already cached, don't generate new cache
		if (!this.imageService.stringsCache)  {
			//Find strings of length 5+
			var strings: string[] = this.imageService.bytes.match(/(?:[A-Za-z]|[0-9]|-|\(|\)|\[|\]|_|\ |!|\?|\.){5,}/g);
			//Sort by length + alphabet
			strings = strings.sort(function (a, b) {
				return b.length - a.length || a.localeCompare(b);
			});
			this.imageService.stringsCache = strings;
		}
		this.stringsA = this.imageService.stringsCache.filter((val, index) => index % 2 == 0);
		this.stringsB = this.imageService.stringsCache.filter((val, index) => index % 2 == 1);
  }

}