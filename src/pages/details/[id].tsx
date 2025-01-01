import React from "react";
import Confirmation from "~/components/Dialog/Confirmation";
import { useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;

export default function DetailsPage() {
  //   const [loading, setLoading] = useState<boolean>(true);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const onConfirmConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    // setLoading(false);
  };

  return (
    <>
      <Confirmation
        open={openConfirmationDialog}
        onCancel={() => {
          setOpenConfirmationDialog(false);
        }}
        onConfirm={() => {
          onConfirmConfirmationDialog();
        }}
      >
        <Text>Are you sure you want to delete this post?</Text>
      </Confirmation>
    </>
  );
}
