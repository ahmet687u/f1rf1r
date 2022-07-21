declare module "f1rf1r";

interface NotificationSettings {
  duration?: number;
  delay?: number;
  animation?: "shake" | "wiggle";
}

interface ModalSettings {
  msg: string;
  header: {
    showHeader: boolean;
    text: string;
  };
  buttons: {
    showButton: boolean;
    success: Function;
    error: Function;
  };
}

declare namespace f1rf1r {
  class F1rf1r {
    init(): void;

    /**
     * Bildirim mesajları için default ayarlar tanımlamak için kullanılır
     *
     * @example
     * instance.notificationSettings = { duration: 3000 }
     */
    set notificationSettings(params: NotificationSettings);
  }

  /**
   * -- Notification --
   * @class
   */
  class Notification {
    /**
     * Bildirim mesajlarının ekrandaki konumunu belirler
     *
     * @example instance.positions = "bottom-right"
     */
    set positions(params: "bootom-right" | "bottom-left" | "top-right" | "top-left");

    /**
     * -- error --
     *
     * @example
     * f1rf1r.error("example f1rf1r notification error message")
     */
    error(msg: string, param: NotificationSettings): void;

    /**
     * -- success --
     *
     * @example
     * f1rf1r.success("example f1rf1r notification success message", { duration: 3000 })
     */
    success(msg: string, param: NotificationSettings): void;
  }

  /**
   * -- Modal --
   * @class
   */
  class Modal {
    /**
     * -- defaultModal --
     * @example
     *
     * modal.defaultModal({
     *  msg: "example f1rf1r modal text",
     *  header: {
     *    showHeader: true,
     *    text: "EXAMPLE f1rf1r MODAL HEADER TITLE"
     *   },
     *   buttons: {
     *    showButton: true,
     *    success: () => alert("example f1rf1r modal success function"),
     *    error: () => alert("example f1rf1r modal error function")
     *   }
     * })
     */
    defaultModal(params: ModalSettings): void;
  }
}

export default f1rf1r;
