import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef,
  Inject, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filter, map, Observable, Subscription } from 'rxjs';
import { CHAIN_ID_TO_TYPE_MAP, MAINNET_CHAIN_ID } from '../../constants';
import { generateJazzicon } from '../../helpers';
import { Ethereum } from '../../interfaces';
import { EtherscanTransactionLocal, TransactionService, WalletService } from '../../services';

export interface AccountModalData {
  header: string;
  change: () => void;
  disconnect: () => void;
}

@Component({
  selector: 'account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountModalComponent implements OnInit, OnDestroy {
  @ViewChild('infoMain', { static: true })
  public infoMain!: ElementRef;

  public identicon: HTMLDivElement;
  public accountAddress: string;
  public etherscanAddress$: Observable<string>;
  public transactions$: Observable<EtherscanTransactionLocal[]>;

  private _sub: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AccountModalData,
    private _cdr: ChangeDetectorRef,
    private _walletService: WalletService,
    private _transactionService: TransactionService,
    private _matDialogRef: MatDialogRef<AccountModalComponent, void>
  ) {
    this.transactions$ = this._transactionService.transactionsChanged$;

    this.etherscanAddress$ = this._walletService.networkChanged$
      .pipe(
        filter((networkId) => Number.isSafeInteger(networkId)),
        map(() => {
          const { chainId, selectedAddress } = (window as any).ethereum as Ethereum;
          const subdomain = chainId === MAINNET_CHAIN_ID ? '' : `${CHAIN_ID_TO_TYPE_MAP[chainId]}.`;

          return `https://${subdomain}etherscan.io/address/${selectedAddress}`;
        }),
      );
  }

  public ngOnInit(): void {
    let identicon: HTMLDivElement;

    this._sub.add(
      this._walletService.accountsChanged$
        .pipe(
          filter((accounts) => accounts?.length > 0),
        )
        .subscribe(([accountAddress]) => {
          this.accountAddress = accountAddress;

          const element = this.infoMain.nativeElement as HTMLDivElement;

          if (identicon && element.contains(identicon)) {
            element.removeChild(identicon);
          }

          identicon = generateJazzicon(this.accountAddress);

          element.insertBefore(identicon, element.firstChild)

          this._cdr.markForCheck();
        }),
    );
  }

  public ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public onCloseClick(): void {
    this._matDialogRef.close();
  }

  public onClearTransactionsClick(): void {
    this._transactionService.clearTransactions();
  }

  public onChangeClick(): void {
    if (typeof this.data.change === 'function') {
      this.data.change();
    }
  }

  public onDisconnectClick(): void {
    if (typeof this.data.disconnect === 'function') {
      this.data.disconnect();
    }
  }
}
