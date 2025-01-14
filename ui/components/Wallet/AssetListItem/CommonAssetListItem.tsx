import React, { ReactElement } from "react"
import { Link } from "react-router-dom"
import { CompleteAssetAmount } from "@tallyho/tally-background/redux-slices/accounts"

import SharedLoadingSpinner from "../../Shared/SharedLoadingSpinner"
import SharedAssetIcon from "../../Shared/SharedAssetIcon"
import styles from "./styles"
import SharedIconRouterLink from "../../Shared/SharedIconRouterLink"

export default function CommonAssetListItem({
  assetAmount,
  initializationLoadingTimeExpired,
}: {
  assetAmount: CompleteAssetAmount
  initializationLoadingTimeExpired: boolean
}): ReactElement {
  const isMissingLocalizedUserValue =
    typeof assetAmount.localizedMainCurrencyAmount === "undefined"

  const contractAddress =
    "contractAddress" in assetAmount.asset
      ? assetAmount.asset.contractAddress
      : undefined

  return (
    <Link
      to={{
        pathname: "/singleAsset",
        state: assetAmount.asset,
      }}
    >
      <div className="asset_list_item">
        <div className="asset_left">
          <SharedAssetIcon
            logoURL={assetAmount?.asset?.metadata?.logoURL}
            symbol={assetAmount?.asset?.symbol}
          />
          <div className="asset_left_content">
            <div className="asset_amount">
              <span className="bold_amount_count">
                {assetAmount.localizedDecimalAmount}
              </span>
              {assetAmount.asset.symbol}
            </div>
            {initializationLoadingTimeExpired && isMissingLocalizedUserValue ? (
              <></>
            ) : (
              <div className="price">
                {isMissingLocalizedUserValue ? (
                  <SharedLoadingSpinner size="small" />
                ) : (
                  `$${assetAmount.localizedMainCurrencyAmount}`
                )}
              </div>
            )}
          </div>
        </div>
        <div className="asset_right">
          <>
            <SharedIconRouterLink
              path="/send"
              state={assetAmount.asset}
              iconClass="asset_icon_send"
            />
            <SharedIconRouterLink
              path="/swap"
              state={{
                symbol: assetAmount.asset.symbol,
                contractAddress,
              }}
              iconClass="asset_icon_swap"
            />
          </>
        </div>
      </div>
      <style jsx>{`
        ${styles}
        .price {
          height: 17px;
          display: flex;
          color: var(--green-40);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.42px;
          line-height: 16px;
        }
      `}</style>
    </Link>
  )
}
