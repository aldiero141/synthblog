import { useEffect, useState } from "react";
import WelcomeDialog from "~/components/Dialog/WelcomeDialog";
import Posts from "~/components/posts";
import { IUserCredentials } from "~/models/component";
import { UserState } from "~/store/user";

export default function Home() {
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState<boolean>(false);

  const onConfirmWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
  };

  const { data: userCredential, setData: setUser } = UserState();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const localStorageUser = JSON.parse(
      userStorage ? userStorage : "{}",
    ) as IUserCredentials;
    if (userCredential?.token) return;
    if (localStorageUser?.token) return setUser(localStorageUser);
    setOpenWelcomeDialog(true);
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

        <Posts />
      </div>
    </>
  );
}
