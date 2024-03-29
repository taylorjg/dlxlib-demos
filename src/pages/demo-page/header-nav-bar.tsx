import { useState } from "react";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ReadmeModal } from "./readme-modal";

import { AvailableDemo } from "types";
import {
  StyledHeaderNavBar,
  StyledBackLink,
  StyledBackLinkIcon,
  // StyledBackLinkText,
  StyledDemoName,
  StyledRightArea,
  StyledHelpLink,
  StyledHelpLinkIcon,
} from "./header-nav-bar.styles";

export type HeaderNavBarProps = {
  availableDemo: AvailableDemo;
};

export const HeaderNavBar: React.FunctionComponent<HeaderNavBarProps> = ({
  availableDemo,
}: HeaderNavBarProps) => {
  const history = useHistory();
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState(false);

  const onBack = () => history.push("/");

  const openReadmeModal = () => {
    setIsReadmeModalOpen(true);
  };

  const closeReadmeModal = () => {
    setIsReadmeModalOpen(false);
  };

  return (
    <>
      <StyledHeaderNavBar data-testid="header-nav-bar">
        <StyledBackLink onClick={onBack}>
          <StyledBackLinkIcon>
            <ArrowBackIcon titleAccess="Back to home page" />
          </StyledBackLinkIcon>
          {/* <StyledBackLinkText>Back</StyledBackLinkText> */}
        </StyledBackLink>

        <StyledDemoName>{availableDemo.name}</StyledDemoName>

        {availableDemo.readmeSource && (
          <>
            <StyledRightArea>
              <StyledHelpLink onClick={openReadmeModal}>
                <StyledHelpLinkIcon>
                  <MenuBookIcon titleAccess="Show DLX matrix details" />
                </StyledHelpLinkIcon>
              </StyledHelpLink>
            </StyledRightArea>
            <ReadmeModal
              demoName={availableDemo.name}
              readmeSource={availableDemo.readmeSource}
              open={isReadmeModalOpen}
              onClose={closeReadmeModal}
            />
          </>
        )}
      </StyledHeaderNavBar>
    </>
  );
};
