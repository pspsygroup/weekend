import {BookingService} from './../../services/booking.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from 'angular-2-local-storage';
import {BillService} from '../../services/bill.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  //update 22.
  // show_error: boolean;
  // billingData: any;
  // showSpinner= false;
  // //update22
  bookingRequestKey: string;
  bookingInfo: any;
  checkin: any;
  checkout: any;
  selectedNights: number;
  checkinDateReadable: string;
  checkOutDateReadable: string;


  constructor(private localstorage: LocalStorageService,private billService: BillService,
              private af: AngularFireDatabase,
              private route: ActivatedRoute, private bookingService: BookingService) {
    this.bookingRequestKey = this.route.snapshot.params['reuestId'];
  }

  ngOnInit() {
    /*update22*/
    // this.af.object('/No5tha/Receipts/' + this.bookingRequestKey).valueChanges()
    //   .subscribe( billdata => {
    //
    //     this.billingData = billdata;
    //
    //     // localStorage.setItem('billData', this.billInfo);
    //   });

    // this.billingData = localStorage.getItem('billData');

    //update22
    // this.show_error = false;
    this.bookingService.getBookingRequestByReqId(this.bookingRequestKey)
      .subscribe((result) => {
        // if (result == null) {
        //   // TODO: Show error message here.
        //   //TODO: return 404 error page:
        //   this.show_error= true;
        //   console.log("go to error page");
        // }
        // else {

          //update
          // if(this.billingData.isPaid){
          //
          //
          //   this.bookingInfo = result;
          //   this.checkin = result['dates']['checkInDate'];
          //   this.checkout = result['dates']['checkOutDate'];
          //   const checkInDateValue = new Date(this.checkin);
          //   const checkOutDateValue = new Date(this.checkout);
          //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          //   ];
          //   this.checkinDateReadable = monthNames[checkInDateValue.getMonth()] + ' ' + checkInDateValue.getDate() + ', ' + checkInDateValue.getFullYear();
          //   this.checkOutDateReadable = monthNames[checkOutDateValue.getMonth()] + ' ' + checkOutDateValue.getDate() + ', ' + checkOutDateValue.getFullYear();
          //
          //   const oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
          //   this.selectedNights = Math.round(Math.abs((checkInDateValue.getTime() - checkOutDateValue.getTime()) / (oneDay)));
          //
          // }
          // else {
          //
          // }
          //upadte



          this.bookingInfo = result;
          this.checkin = result['dates']['checkInDate'];
          this.checkout = result['dates']['checkOutDate'];
          const checkInDateValue = new Date(this.checkin);
          const checkOutDateValue = new Date(this.checkout);
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
          this.checkinDateReadable = monthNames[checkInDateValue.getMonth()] + ' ' + checkInDateValue.getDate() + ', ' + checkInDateValue.getFullYear();
          this.checkOutDateReadable = monthNames[checkOutDateValue.getMonth()] + ' ' + checkOutDateValue.getDate() + ', ' + checkOutDateValue.getFullYear();

          const oneDay = 24 * 60 * 60 * 1000; // one day in millisecond
          this.selectedNights = Math.round(Math.abs((checkInDateValue.getTime() - checkOutDateValue.getTime()) / (oneDay)));


      });
  }

  //update22
  // onPayWith(billingData: any) {
  //
  //   this.showSpinner = true;
  //   this.billService.InitilizeKnetRequest(billingData)
  //     .subscribe( result => {
  //       const redirectUrl = result.location + '?paymentID=' + result.paymentID;
  //       const saveReceiptData = {
  //         'companyName' : 'Weekend',
  //         'done' : false,
  //         'email' : billingData.email,
  //         'items' : [ {
  //           'from' : billingData.checkin,
  //           'itemID' : billingData.houseId,
  //           'to' : billingData.checkout,
  //           'type' : 'chalet'
  //         } ],
  //         'phoneNumber' : billingData.phoneNumber,
  //         'timestamp' : Math.round((new Date()).getTime() * 1000),
  //         'type' : 'newRecepit',
  //         'userUID' : billingData.userid,
  //         'orderId': billingData.orderid
  //       };
  //
  //       this.af.object(`/No5tha/receiptOrder/${billingData.orderid}`).set(saveReceiptData)
  //         .then(() => {
  //           this.showSpinner = true;
  //           window.location.href = redirectUrl;
  //         }).catch((error) => {
  //         console.log(error);
  //       });
  //
  //
  //     });
  // }
}
