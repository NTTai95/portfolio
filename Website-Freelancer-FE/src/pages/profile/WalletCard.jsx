import { Card, notification, Modal, Form, InputNumber, message } from "antd";
import formater from "@utils/formater";
import profileApi from "@api/profileApi";
import walletApi from "@api/walletApi";
import { useState } from "react";

const WalletCard = ({ wallet }) => {
  const [notificationApi, contextNotification] = notification.useNotification();
  const [messageApi, contextMessage] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(null);

  const handleWithdraw = () => {
    notificationApi.info({
      message: "Cập nhật sớm!",
      description: "Chức năng đang được phát triển.",
      showProgress: true,
    });
  };

  const handleCreateWallet = async () => {
    const logined = JSON.parse(sessionStorage.getItem("logined"));
    if (!logined) return;
    const accountId = logined.id;

    const resProfile = await profileApi.getByAccountId(accountId);

    await walletApi.create({
      profileId: resProfile.data.id,
    });

    window.location.reload();
  };

  const handleOk = async () => {
    if (!amount) {
      messageApi.error("Vui lòng nhập số tiền cần nạp.");
      return;
    } else if (amount < 10000) {
      messageApi.error("Số tiền nạp tối thiểu là 10.000đ.");
      return;
    } else if (amount > 100000000) {
      messageApi.error("Số tiền nạp tối đa là 100.000.000đ.");
      return;
    }

    const res = await walletApi.deposit(wallet.id, amount);
    window.open(res.data);
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return wallet ? (
    <>
      {contextMessage}
      {contextNotification}
      <Modal
        title="Nạp tiền"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputNumber
          style={{ width: "100%" }}
          addonAfter="₫"
          placeholder="nhập số tiền bạn muốn nạp..."
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          value={amount}
          onChange={(value) => setAmount(value)}
        />
      </Modal>
      <Card
        style={{ fontWeight: "bold", color: "green" }}
        actions={[
          <span onClick={() => setIsModalOpen(true)}>Nạp</span>,
          <span onClick={handleWithdraw} disa>
            Rút
          </span>,
        ]}
        title="Số dư ví FreelancePay"
      >
        {formater.formatCurrency(wallet?.balance)}
      </Card>
    </>
  ) : (
    <Card
      title="Số dư ví FreelancePay"
      actions={[<span onClick={handleCreateWallet}>Tạo ví</span>]}
    >
      <p>
        Bạn chưa có ví FreelancerPay. Hãy tạo ví để thực hiện các giao dịch trên
        hệ thống.
      </p>
    </Card>
  );
};

export default WalletCard;
