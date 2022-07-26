declare module "f1rf1r";

interface NotificationSettings {
  duration?: number;
  delay?: number;
  animate?: {
    name: "show" | "fadeIn";
    speed: number;
  };
}

interface ModalSettings {
  header: string;
  buttons: {
    success: Button;
    error: Button;
  };
}

interface DefaultModalSettings extends ModalSettings {
  msg: string;
}

interface FormModalSettings extends ModalSettings {
  inputs: Array<Input>;
}

interface Input extends HTMLInputElement {
  label: string;
}

interface Button {
  text?: string;
  func?: Function;
}

interface Data {
  name: string;
  value: string;
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

    /**
     * Modallar için default ayarlar tanımlamak için kullanılır
     *
     * @example
     * f1rf1r.modalSettings = { header: "F1rf1r Default Header" }
     */
    set modalSettings(params: ModalSettings);
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
      params: "bottom-right" | "bottom-left" | "top-right" | "top-left"
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
     * Modal içindeki inputların değerlerini almak için kullanılır
     *
     * @example
     * const formData = modal.data
     */
    get data(): Array<Data>;

    /**
     * -- modal --
     *
     * Default modallar oluşturmak için kullanılır
     *
     * @example
     * modal.modal({
     *   msg: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
     *   header: "My Header",
     *   buttons: {
     *     success: {
     *       text: "Okke",
     *       func: () => console.log("fırfır modal success function")
     *     }
     *   }
     * })
     */
    modal(params: DefaultModalSettings): void;

    /**
     *
     * -- formModal --
     *
     * Form modalları oluşturmak için kullanılır
     *
     * @example
     * modal.formModal({
     *   header: "Form Gönder",
     *   inputs: [
     *     {
     *       label: "Kullanıcı Adı Giriniz",
     *       placeholder: "Kullanıcı adı giriniz",
     *       name: "username"
     *     },
     *     {
     *       label: "Email Giriniz",
     *       placeholder: "Mail giriniz",
     *       name: "mail"
     *     },
     *     {
     *       label: "Şifre giriniz",
     *       required: true,
     *       placeholder: "Şifre Giriniz",
     *       type: "password"
     *     }
     *   ],
     *   buttons: {
     *     success: {
     *       text: "Gönder",
     *       func: value => console.log(`Value = ${value}`)
     *     },
     *   }
     * })
     */
    formModal(params: FormModalSettings): void;
  }
}

export default f1rf1r;
