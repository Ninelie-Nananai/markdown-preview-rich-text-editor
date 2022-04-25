import { useState } from "react";
import { Modal, Button, Group, Text } from "@mantine/core";
import { CheckboxGroup, Checkbox } from "@mantine/core";
import { InputWrapper, Input, Space } from "@mantine/core";
import { GoReport } from "react-icons/go";
import { useNotifications } from "@mantine/notifications";
import { CheckIcon } from "@modulz/radix-icons";
import useTranslation from "next-translate/useTranslation";

export default function Report() {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(true);
  const notifications = useNotifications();

  let { t } = useTranslation();

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={t("report:title")}
      >
        <CheckboxGroup
          color="red"
          orientation="vertical"
          label={t("report:sub_title")}
          required
        >
          <Checkbox value="value1" label={t("report:Checkbox.1")} />
          <Checkbox value="value2" label={t("report:Checkbox.2")} />
          <Checkbox value="value3" label={t("report:Checkbox.3")} />
          <Checkbox value="value4" label={t("report:Checkbox.4")} />
          <Checkbox
            value="value5"
            label={t("report:Checkbox.5")}
            onClick={() => setChecked(!checked)}
          />
        </CheckboxGroup>
        <Space h="sm" />
        <InputWrapper id="input-demo" label={t("report:sub_title2")}>
          <Input id="input-demo" disabled={checked} />
        </InputWrapper>
        <Space h="sm" />
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={() => {
            const id = notifications.showNotification({
              loading: true,
              title: t("report:showNotification.title"),
              message: t("report:showNotification.message"),
              autoClose: false,
              disallowClose: true,
            });

            setTimeout(() => {
              notifications.updateNotification(id, {
                id,
                color: "teal",
                title: t("report:updateNotification.title"),
                message: t("report:updateNotification.message"),
                icon: <CheckIcon />,
                autoClose: 3000,
              });
            }, 3000);
            setOpened(false);
          }}
        >
          <Group spacing={5}>
            <GoReport />
            {t("report:btn")}
          </Group>
        </Button>
      </Modal>
      <Group position="center">
        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          onClick={() => setOpened(true)}
        >
          <Group spacing={5}>
            <GoReport />
            {t("report:btn")}
          </Group>
        </Button>
      </Group>
    </>
  );
}
