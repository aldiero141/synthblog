import { useEffect, useState } from "react";
import WelcomeDialog from "~/components/Dialog/WelcomeDialog";
import Posts from "~/components/posts";
import { useUserState } from "~/store/user";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState<boolean>(false);
  const { data: userData } = useUserState();

  const onConfirmWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!userData?.token) setOpenWelcomeDialog(true);
    else setLoading(false);
  }, []);

  return (
    <>
      <div className="mt-8">
        <WelcomeDialog
          key="welcome-dialog"
          open={openWelcomeDialog}
          onConfirm={() => {
            onConfirmWelcomeDialog();
          }}
        />

        <Posts loading={loading} />
      </div>
    </>
  );
}
