import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class InfoService {
  actualVersion: string;

  constructor(public http: HttpClient,
    public storage: Storage) {
    this.getPackage().subscribe(data => {
      this.actualVersion = data['version'];

    });
  }

  version2Number(version) {
    return (version) ? version.split('.').reduce((acc, v, index) => acc + Number(v) / Math.pow(10, index), 0) : 0;
  }


  getPackage() {
    return this.http.get('assets/package.json');
  }
  async setActualVersion(version: string = this.actualVersion) {

    return this.storage.set('version', version);
  }
  async areThereNews() {
    const previous_version = await this.storage.get('version');
    if (!previous_version) {
      return 1;
    }
    if (this.version2Number(previous_version) < this.version2Number(this.actualVersion)) {
      return 2;
    }

    return 0;
  }

}

