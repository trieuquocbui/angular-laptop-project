import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigModel } from 'src/app/models/config';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-form-updating-config',
  templateUrl: './form-updating-config.component.html',
  styleUrls: ['./form-updating-config.component.css']
})
export class FormUpdatingConfigComponent implements OnInit {
  messageError?: string;
  message?: string;
  configId?: string;

  constructor(private formBuilder: FormBuilder,private configService:ConfigService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.configId = this.route.snapshot.params['configId'];
    this.findById(this.configId!);
    this.config = this.formBuilder.group({
      nameConfig: [null, Validators.required],
      ram: [null, Validators.required],
      cpu: [null, Validators.required],
      displaySize: [null, Validators.required],
      graphicCard: [null, Validators.required],
      operatingSystem: [null, Validators.required],
      weight: [null, Validators.required],
      madeIn: [null, Validators.required],
      hardDrive: [null, Validators.required],
      madeYear: [null, Validators.required],
      size: [null, Validators.required],
    });
  }

  config: FormGroup = new FormGroup({
    nameConfig: new FormControl(null),
    ram: new FormControl(null),
    cpu: new FormControl(null),
    displaySize: new FormControl(null),
    graphicCard: new FormControl(null),
    operatingSystem: new FormControl(null),
    weight: new FormControl(null),
    madeIn: new FormControl(null),
    hardDrive: new FormControl(null),
    madeYear: new FormControl(null),
    size: new FormControl(null),
  });

  checked($event: boolean, arg1: null, arg2: string) {
    if ($event) {
      this.onSubmit();
    } else {
      this.messageError = 'huỷ thành công';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.config.controls;
  }

  findById(configId: string) {
    this.configService.findById(configId).subscribe((result) => {
      
      this.f['nameConfig'].setValue(result.nameConfig);
      this.f['ram'].setValue(result.ram);
      this.f['cpu'].setValue(result.cpu);
      this.f['displaySize'].setValue(result.displaySize);
      this.f['graphicCard'].setValue(result.graphicCard);
      this.f['operatingSystem'].setValue(result.operatingSystem);
      this.f['weight'].setValue(result.weight);
      this.f['madeIn'].setValue(result.madeIn);
      this.f['hardDrive'].setValue(result.hardDrive);
      this.f['madeYear'].setValue(result.madeYear);
      this.f['size'].setValue(result.size);
      console.log(result)
    });
  }

  onSubmit() {
    let config = new ConfigModel();
    config.id = Number(this.configId);
    config.nameConfig = this.f['nameConfig'].value;
    config.ram = this.f["ram"].value;
    config.cpu = this.f['cpu'].value;
    config.displaySize = this.f['displaySize'].value;
    config.graphicCard = this.f['graphicCard'].value;
    config.operatingSystem = this.f['operatingSystem'].value;
    config.weight = this.f["weight"].value;
    config.madeIn = this.f['madeIn'].value;
    config.hardDrive = this.f['hardDrive'].value;
    config.madeYear = this.f['madeYear'].value;
    config.size = this.f['size'].value;
    console.log(config)
    this.configService.updateConfig(config).subscribe(
      (result) => {
        this.message = result.message;
        setTimeout(() => {
          this.message = undefined
        }, 3000);
      },
      (error) => {
        this.message = error.error.message;
        setTimeout(() => {
          this.message = undefined
        }, 3000);
        
      }
    );


  }

}
