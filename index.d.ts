declare module "f1rf1r";

interface NotificationSettings {
  duration?: number;
  delay?: number;
  animate?: {
    name: "show" | "fadeIn";
    speed: number;
  };
}

interface DefaultModalSettings {
  msg: string;
  header: string;
  buttons: {
    success: Function;
    error: Function;
  };
}

interface Input {
  label: string; 
  name: string; 
  placeholder: string
}

interface FormModalSettings {
  inputs: Array<Input>;
  header: {
    text: string;
  };
  buttons: {
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
     * f1rf1r.notificationSettings = { duration: 3000 }
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
     * @example f1rf1r.positions = "top-center"
     */
    set positions(
      params:
        | "bootom-right"
        | "bottom-left"
        | "top-right"
        | "top-left"
        | "top-center"
        | "bottom-center"
    );

    /**
     * -- error --
     *
     *  Hata mesajları oluşturmak için kullanılır
     *
     * @example
     * f1rf1r.error("example f1rf1r notification error message")
     */
    error(msg: string, param: NotificationSettings): void;

    /**
     * -- success --
     *
     * Başarılı mesajları oluşturmak için kullanılır
     *
     * @example
     * f1rf1r.success("example f1rf1r notification success message", { duration: 3000 })
     */
    success(msg: string, param: NotificationSettings): void;

    /**
     * -- info --
     *
     * İnfo mesajları oluşturmak için kullanılır
     *
     * @example
     * f1rf1r.info("example f1rf1r notification info message")
     */
    info(msg: string, param: NotificationSettings): void;

    /**
     * -- warning --
     *
     * Uyarı mesajları oluşturmak için kullanılır
     *
     * @example
     * f1rf1r.warning("example f1rf1r notification warning message")
     */
    warning(msg: string, param: NotificationSettings): void;
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
     *    text: "EXAMPLE f1rf1r MODAL HEADER TITLE"
     *   },
     *   buttons: {
     *    success: () => alert("example f1rf1r modal success function"),
     *    error: () => alert("example f1rf1r modal error function")
     *   }
     * })
     */
    modal(params: DefaultModalSettings): void;

    formModal(params: FormModalSettings): void;
  }
}

export default f1rf1r;
