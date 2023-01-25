import { StyledVersion } from "./Version.styles"
import packageJson from "../../../package.json"

export const Version = () => {
  return (
    <StyledVersion>version: {packageJson.version}</StyledVersion>
  )
}
