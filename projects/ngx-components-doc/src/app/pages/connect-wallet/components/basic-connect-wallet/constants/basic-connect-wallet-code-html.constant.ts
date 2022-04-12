export const BasicConnectWalletCodeHtml = `<div class="doc-grid-container">
  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">Default</h5>

    <auc-connect-wallet (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>

  <div class="doc-grid-item">
    <h5 class="doc-grid-item-title">With balance</h5>

    <auc-connect-wallet [showBalance]="true"
                        (onConnect)="onConnect($event)"
                        (onDisconnect)="onDisconnect()"
    >
    </auc-connect-wallet>
  </div>
</div>
`;