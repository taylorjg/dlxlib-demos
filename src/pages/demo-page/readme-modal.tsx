import { useEffect, useState } from "react";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { StyledContent } from "./readme-modal.styles";

export type ReadmeModalProps = {
  demoName: string;
  readmeSource: string;
  open: boolean;
  onClose: () => void;
};

export const ReadmeModal: React.FC<ReadmeModalProps> = ({
  demoName,
  readmeSource,
  open,
  onClose,
}) => {
  const [readmeMarkdown, setReadmeMarkdown] = useState("");

  useEffect(() => {
    const loadReadmeSource = async () => {
      const response = await axios.get(readmeSource);
      setReadmeMarkdown(response.data);
    };
    loadReadmeSource();
  });

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {demoName}
          </Typography>
        </Toolbar>
      </AppBar>
      <StyledContent>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {readmeMarkdown}
        </ReactMarkdown>
      </StyledContent>
    </Dialog>
  );
};
