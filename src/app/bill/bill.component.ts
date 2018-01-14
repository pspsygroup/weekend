import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {BillService} from '../services/bill.service';

// import {LocalStorageService} from 'angular-2-local-storage';

@Component({
  selector: 'app-bill', templateUrl: './bill.component.html', styleUrls: ['./bill.component.css']

})
export class BillComponent implements OnInit {
  billInfo: any;
  billingData: any;
  showSpinner = false;
  email: string;
  isPaid: boolean;
  isError: boolean;

  constructor(private af: AngularFireDatabase, private route: ActivatedRoute, private billService: BillService, private router: Router, private localstorage: LocalStorageService, ) {
    const billid = this.route.snapshot.params.billid;
    this.af.object('/No5tha/Receipts/' + billid).valueChanges()
      .subscribe(billdata => {

        this.billInfo = billdata;
        if (billdata != null) {
          if (this.billInfo.isPaid != undefined) {
            this.isPaid = this.billInfo.isPaid;
            if(this.isPaid==true)
            {
            this.router.navigate(['/bill-receipt/' + billid]);

            }

          }
          // localStorage.setItem('billData', this.billInfo);
          this.localstorage.set('billingData', this.billInfo);
        } else {
          this.isError = true;
        }


      });

  }

  ngOnInit() {

    this.email = 'aa@aa.com';
    // this.billingData = localStorage.getItem('billData');
  }

  // onPayWith(billingData: any) {
  onPayWith(billingData) {

    this.showSpinner = true;
    this.billService.InitilizeKnetRequestbyBill(billingData)
      .subscribe(result => {
        const redirectUrl = result.location + '?paymentID=' + result.paymentID;
        const saveReceiptData = {
          'billid':billingData.billid,
          'companyName': 'Weekend',
          'done': false,
          // 'email': billingData.email,
          // 'items': [{
          //   'from': billingData.checkin, 'itemID': billingData.houseId, 'to': billingData.checkout, 'type': 'chalet'
          // }],
          // 'phoneNumber': billingData.phoneNumber,
          'timestamp': Math.round((new Date()).getTime() * 1000),
          'type': 'newRecepit',
          'userUID': billingData.userid,
          // 'orderId': billingData.orderid
        };

        this.af.object(`/No5tha/receiptOrder/${billingData.orderid}`).set(saveReceiptData)
          .then(() => {
            this.showSpinner = true;
            window.location.href = redirectUrl;
          }).catch((error) => {
          console.log(error);
        });


      });
    // this.router.navigate(['/confirm-payment']);

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
