import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { StyledContent, StyledTitle } from "./readme-modal.styles";

export type ReadmeModalProps = {
  demoName: string;
  readmeSource: string;
  open: boolean;
  onClose: () => void;
};

export const ReadmeModal: React.FunctionComponent<ReadmeModalProps> = ({
  demoName,
  readmeSource,
  open,
  onClose,
}: ReadmeModalProps) => {
  const theme = useTheme();
  const mediaQuery = theme.breakpoints.down("md");
  const isSmallScreen = useMediaQuery(mediaQuery);
  const [readmeMarkdown, setReadmeMarkdown] = useState("");

  useEffect(() => {
    const loadReadmeSource = async () => {
      const response = await axios.get(readmeSource);
      setReadmeMarkdown(response.data);
    };
    loadReadmeSource();
  });

  return (
    <Dialog
      fullScreen={isSmallScreen}
      maxWidth="md"
      fullWidth={true}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <StyledTitle>
          <Typography variant="h5" component="div">
            {demoName}
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </StyledTitle>
      </DialogTitle>
      <DialogContent dividers>
        <StyledContent>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {readmeMarkdown}
          </ReactMarkdown>
        </StyledContent>
      </DialogContent>
    </Dialog>
  );
};
