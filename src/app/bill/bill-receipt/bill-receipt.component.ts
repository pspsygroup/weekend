import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {BillService} from '../../services/bill.service';

// import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-bill-receipt',
  templateUrl: './bill-receipt.component.html',
  styleUrls: ['./bill-receipt.component.css']
})
export class BillReceiptComponent implements OnInit {
  billInfo: any;
  billingData: any;
  showSpinner = false;
  email: string;

  isError: boolean;

  constructor(private af: AngularFireDatabase, private route: ActivatedRoute, private billService: BillService, private router: Router) {
    const billid = this.route.snapshot.params.billid;
    // receiptResponse
    this.af.object('/No5tha/receiptResponse/' + billid).valueChanges()
      .subscribe(billdata => {

        this.billInfo = billdata;
        // if (billdata != null) {
        //   localStorage.setItem('billData', this.billInfo);
        //   this.isError = false;
        //
        // } else {
        //   this.isError = true;
        // }

      });

  }

  ngOnInit() {
    // this.isPaid = true;
    this.email = 'aa@aa.com';
    // this.billingData = localStorage.getItem('billData');

  }

  //update finish.
  onSendEmail(email: string) {

    const billid = this.route.snapshot.params.billid;
    const saveEmailOrder = {
      'type': 'receipt', 'to': email, 'id': billid
    };
    this.af.object(`/No5tha/emailOrder/${billid}`).set(saveEmailOrder)
      .then(() => {
        this.showSpinner = true;
        // window.location.href = redirectUrl;
        console.log(saveEmailOrder);
        alert('sucess');

      }).catch((error) => {
      console.log(error);
      alert(error);
    });

  }

}
