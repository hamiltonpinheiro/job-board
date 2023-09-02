import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { Subscription, combineLatest } from 'rxjs';
import { Education, FileSelectEvent, Person, UpdatePersonDto, WorkExperience } from 'src/app/models';
import { MAX_YEAR, MIN_YEAR, NAME_MAX_LENGTH, NAME_MIN_LENGTH } from 'src/app/shared/constants';
import { removeEmptyValuesFromObject } from 'src/app/shared/helpers';
import { locationValidator, yearSpanValidator } from 'src/app/shared/validators';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss'],
})
export class EditPersonComponent {
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  selectedFile: File | null = null;
  imageSource: string;
  person!: Person;
  editForm!: FormGroup;

  addWorkExperienceEnabled = true;
  submitFormEnabled = true;

  buttonsEnabledSub!: Subscription;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private fb: NonNullableFormBuilder,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.person = this.dialogConfig.data.person;
    this.imageSource = this.person.imagePath ?? './assets/images/user-default-icon.png';

    this.editForm = this.fb.group({
      name: [
        this.person.name,
        [Validators.required, Validators.minLength(NAME_MIN_LENGTH), Validators.maxLength(NAME_MAX_LENGTH)],
      ],
      about: [this.person.about, [Validators.maxLength(500)]],
      location: [this.person.location],
      skills: this.fb.control<string[]>(this.person.skills),
      prevExperience: this.fb.array(this.person.prevExperience),
      education: this.fb.array(this.person.education),
    });
  }

  onImageSelected(event: FileSelectEvent) {
    console.log(event);
    this.selectedFile = event.currentFiles[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSource = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }

    this.fileUpload.clear();
  }

  saveChanges() {
    const formValue = removeEmptyValuesFromObject(this.editForm.getRawValue());
    console.log(formValue);
    this.dialogRef.close({ person: formValue, image: this.selectedFile } as UpdatePersonDto);
  }

  cancel() {
    this.dialogRef.close();
  }

  addWorkExperience() {
    this.prevExperience.push(this.createWorkExperienceGroup());
    this.changeDetectorRef.detectChanges();
  }

  deleteWorkExperience(index: number) {
    this.prevExperience.removeAt(index);
  }

  addEducation() {
    this.education.push(this.createEducationGroup());
  }

  deleteEducation(index: number) {
    this.education.removeAt(index);
  }

  createWorkExperienceGroup(job?: WorkExperience) {
    return this.fb.control<WorkExperience>({
      companyName: job?.companyName ?? '',
      position: job?.position ?? '',
      description: job?.description ?? '',
      skills: job?.skills || [],
      yearFrom: job?.yearFrom ?? MAX_YEAR,
      yearTo: job?.yearTo ?? MAX_YEAR,
    });
  }

  createEducationGroup(education?: Education) {
    return this.fb.control<Education>({
      school: education?.school ?? '',
      degree: education?.degree ?? '',
      grade: education?.grade ?? 0,
      yearFrom: education?.yearFrom ?? MAX_YEAR,
      yearTo: education?.yearTo ?? MAX_YEAR,
    });
  }

  get name() {
    return this.editForm.get('name')!;
  }

  get about() {
    return this.editForm.get('about')!;
  }

  get location() {
    return this.editForm.get('location')!;
  }

  get skills() {
    return this.editForm.get('skills')!;
  }

  get prevExperience() {
    return this.editForm.get('prevExperience')! as FormArray;
  }

  get education() {
    return this.editForm.get('education')! as FormArray;
  }
}
