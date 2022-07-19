declare module "f1rf1r";

interface NotificationSettings {
  duration?: number;
  delay?: number;
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
  /**
   * -- Notification --
   * @class
   */
  declare class Notification {
    /**
     * Bildirim mesajlarının ekrandaki konumunu belirler
     * 
     * @example instance.positions = "bottom-right"
     */
    positions: string;

    /**
     * Bildirim mesajları için default ayarlar tanımlamak için kullanılır
     * 
     * @example
     * instance.options = { duration: 3000 }
     */
    options: object;

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
  declare class Modal {
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
