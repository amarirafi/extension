import React, { ReactElement } from "react"
import { CompleteAssetAmount } from "@tallyho/tally-background/redux-slices/accounts"

import DoggoAssetListItem from "./AssetListItem/DoggoAssetListItem"
import CommonAssetListItem from "./AssetListItem/CommonAssetListItem"

interface Props {
  assetAmount: CompleteAssetAmount
  initializationLoadingTimeExpired: boolean
}

export default function WalletAssetListItem(props: Props): ReactElement {
  const { assetAmount, initializationLoadingTimeExpired } = props

  const isDoggoAsset = assetAmount.asset.symbol === "DOGGO"

  return (
    <li>
      {isDoggoAsset ? (
        <DoggoAssetListItem assetAmount={assetAmount} />
      ) : (
        <CommonAssetListItem
          assetAmount={assetAmount}
          initializationLoadingTimeExpired={initializationLoadingTimeExpired}
        />
      )}
      <style jsx global>
        {`
          .asset_icon {
          mask-size: cover;
          background-color: var(--green-60);
          width: 12px;
          height: 12px;
          }
          .asset_icon_earn {
          width: 22px;
          height: 22px;
          mask-image: url("./images/earn_tab@2x.png");
          margin-left: 10px;
          margin-right: -5px;
          }
          .asset_icon_gift {
          width: 22px;
          height: 22px;
          mask-image: url("./images/gift@2x.png");
          }
          .asset_icon_send {
          mask-image: url("./images/send_asset.svg");
          }
          .asset_icon_swap {
          mask-image: url("./images/swap_asset.svg");
        `}
      </style>
    </li>
  )
}
