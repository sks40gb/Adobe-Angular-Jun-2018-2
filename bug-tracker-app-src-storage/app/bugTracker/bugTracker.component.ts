import { Component } from '@angular/core';

import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{


	bugs : Bug[] = [];

	sortAttr : string = 'name';
	sortDesc : boolean = false;

	constructor(private bugOperations : BugOperationsService){
		this.bugs = this.bugOperations.getAll();	
	}

	onNewBugCreated(newBug){
		this.bugs = [...this.bugs, newBug];
	}

	onBugNameClick(bugToToggle){
		let toggledBug = this.bugOperations.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugOperations.remove(closedBug));

		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	
}