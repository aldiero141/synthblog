import { useEffect, useState } from "react";
import WelcomeDialog from "~/components/Dialog/WelcomeDialog";
import Posts from "~/components/posts";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState<boolean>(false);

  const onConfirmWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenWelcomeDialog(true);
    }, 200);
  }, []);

  return (
    <>
      <WelcomeDialog
        key="welcome-dialog"
        open={openWelcomeDialog}
        onConfirm={() => {
          onConfirmWelcomeDialog();
        }}
      />

      <Posts loading={loading} />
    </>
  );
}
