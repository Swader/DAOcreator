// TODO: list of steps to take, each with their own transactions that need to be sent.
// TODO: move away from using redux
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { RootState } from "../../../state"
import { Founder, SchemeConfig } from "../../../lib/integrations/arc"

// eslint-disable-next-line
interface Props extends WithStyles<typeof styles> {
  daoName: string
  tokenName: string
  tokenSymbol: string
  founders: Founder[]
  schemes: SchemeConfig[]
  stepNumber: number
  stepValid: boolean
}

const DeployStep: React.SFC<Props> = ({}) => <></>

// STYLE
const styles = (theme: Theme) => createStyles({})

const componentWithStyles = withStyles(styles)(DeployStep)

// STATE
const mapStateToProps = (state: RootState) => {
  return {
    daoName: state.daoCreator.config.daoName,
    tokenName: state.daoCreator.config.tokenName,
    tokenSymbol: state.daoCreator.config.tokenSymbol,
    founders: state.daoCreator.founders,
    schemes: state.daoCreator.schemes,
    stepNumber: state.daoCreator.step,
    stepValid: state.daoCreator.stepValidation[state.daoCreator.step],
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentWithStyles)
