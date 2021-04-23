import { makeStyles } from "@material-ui/core";
import React from "react";
import { SERVICE_NAME } from "../../Constants";
import { CardWithBelowContent } from "../CardWithBelowContent";

const useStyles = makeStyles({
  placeholder: {
    background: "rgba(207,216,220,.2)",
    borderTop: "1px solid rgba(0,0,0,.12)",
    color: "rgba(0,0,0,.54)",
    fontSize: "13px",
    lineHeight: "20px",
    textAlign: "center",
    margin: "0 -20px -20px",
    padding: "60px 20px",
  },
});

export default function UsageFreeCard() {
  const classes = useStyles();

  const subTitle = `${SERVICE_NAME} では、有料のインフラストラクチャ
  プロダクトに無料枠が用意されています。これらの無料枠のしきい値を超える使用量に対してのみ請求が発生します。`;
  return (
    <CardWithBelowContent title="無料枠" subTitle={subTitle}>
      <div className={classes.placeholder}>
        プロジェクトは最近、請求対象となる {SERVICE_NAME}{" "}
        サービスを使用していません。
      </div>
    </CardWithBelowContent>
  );
}
