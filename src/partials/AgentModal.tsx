import { Modal } from 'flowbite-react';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { Agents } from '../lib/types';
import { useWatch } from 'react-hook-form';
import { useFormLogic } from '../hooks.tsx/useFormLogic';
import { useFileUpload } from '../hooks.tsx/useFileUpload';

interface AgentModalProps {
    openModal: boolean;
    onClose: () => void;
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

const AgentModal: FC<AgentModalProps> = ({
    openModal,
    onClose,
    setOpenModal
}) => {

  const { register: registerAgent, handleSubmit: handleAgentSubmit, control: agentControl, setValue: setAgentValue, errors: agentErrors, isSubmitted: isAgentSubmitted, onSubmit: onAgentSubmit } = useFormLogic<Agents>('agents', setOpenModal);
  const agentFormValues = useWatch({ control: agentControl })
  const { imagePreview: agentImagePreview, isPreviewVisible: isAgentPreviewVisible, handleFileChange: handleAgentFileChange, handleDelete: handleAgentDelete, imageError } = useFileUpload('agentImagePreview');


    // Load saved form data from local storage
  useEffect(() => {
    const savedAgentFormData = localStorage.getItem('addAgentForm');
    if (savedAgentFormData) {
        const parsedFormData = JSON.parse(savedAgentFormData);
        Object.keys(parsedFormData).forEach((key) => {
            setAgentValue(key as keyof Agents, parsedFormData[key]);
        });
    }
  }, [setAgentValue]);

  // Save agent form data to local storage (if required)
  useEffect(() => {
      localStorage.setItem('addAgentForm', JSON.stringify(agentFormValues));
  }, [agentFormValues]);

  return (
    <Modal dismissible show={openModal} size={'5xl'} onClose={onClose}>
      <Modal.Body>
        <div className="py-[63px] px-[81px]">
          <h2 className="font-medium text-[2rem] leading-[2.4rem] text-center">
            აგენტის დამატება
          </h2>

          <form onSubmit={handleAgentSubmit(onAgentSubmit)} className="mt-[61px]">
            <div className="grid grid-cols-2 gap-7">
              {/* name */}
              <div>
                <label htmlFor="name" className="font-medium text-sm leading-[1.05rem]">
                  სახელი *
                </label>
                <input
                  {...registerAgent('name', { required: true, minLength: 2 })}
                  type="text"
                  id="name"
                  className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                    agentErrors.name
                      ? 'border-redPrimary'
                      : isAgentSubmitted
                      ? 'border-greenPrimary'
                      : 'border-black'
                  } rounded-md`}
                />
                <div className="mt-1 flex items-center gap-[7px]">
                  {/* Validation message */}
                  <p
                    className={`text-sm leading-[1.05rem] ${
                      agentErrors.name
                        ? 'text-redPrimary'
                        : isAgentSubmitted
                        ? 'text-greenPrimary'
                        : 'text-black'
                    }`}
                  >
                    მინიმუმ ორი სიმბოლო
                  </p>
                </div>
              </div>

              {/* surname */}
              <div>
                <label htmlFor="surname" className="font-medium text-sm leading-[1.05rem]">
                  გვარი *
                </label>
                <input
                  {...registerAgent('surname', { required: true, minLength: 2 })}
                  type="text"
                  id="surname"
                  className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                    agentErrors.surname
                      ? 'border-redPrimary'
                      : isAgentSubmitted
                      ? 'border-greenPrimary'
                      : 'border-black'
                  } rounded-md`}
                />
                <div className="mt-1 flex items-center gap-[7px]">
                  {/* Validation message */}
                  <p
                    className={`text-sm leading-[1.05rem] ${
                      agentErrors.surname
                        ? 'text-redPrimary'
                        : isAgentSubmitted
                        ? 'text-greenPrimary'
                        : 'text-black'
                    }`}
                  >
                    მინიმუმ ორი სიმბოლო
                  </p>
                </div>
              </div>

              {/* email */}
              <div>
                <label htmlFor="email" className="font-medium text-sm leading-[1.05rem]">
                  ელ-ფოსტა *
                </label>
                <input
                  {...registerAgent('email', {
                    required: true,
                    validate: (value: string) => value.includes('@redberry.ge'),
                  })}
                  type="text"
                  id="email"
                  className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                    agentErrors.email
                      ? 'border-redPrimary'
                      : isAgentSubmitted
                      ? 'border-greenPrimary'
                      : 'border-black'
                  } rounded-md`}
                />
                <div className="mt-1 flex items-center gap-[7px]">
                  {/* Validation message */}
                  <p
                    className={`text-sm leading-[1.05rem] ${
                      agentErrors.email
                        ? 'text-redPrimary'
                        : isAgentSubmitted
                        ? 'text-greenPrimary'
                        : 'text-black'
                    }`}
                  >
                    გამოიყენეთ @redberry.ge ფოსტა
                  </p>
                </div>
              </div>

              {/* phone */}
              <div>
                <label htmlFor="phone" className="font-medium text-sm leading-[1.05rem]">
                  ტელეფონის ნომერი *
                </label>
                <input
                  {...registerAgent('phone', { required: true, pattern: /^5[0-9]{8}$/})}
                  type="text"
                  id="phone"
                  className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                    agentErrors.phone
                      ? 'border-redPrimary'
                      : isAgentSubmitted
                      ? 'border-greenPrimary'
                      : 'border-black'
                  } rounded-md`}
                />
                <div className="mt-1 flex items-center gap-[7px]">
                  {/* Validation message */}
                  <p
                    className={`text-sm leading-[1.05rem] ${
                      agentErrors.phone
                        ? 'text-redPrimary'
                        : isAgentSubmitted
                        ? 'text-greenPrimary'
                        : 'text-black'
                    }`}
                  >
                    მხოლოდ რიცხვები
                  </p>
                </div>
              </div>
            </div>

            {/* image */}
            <div className="mt-5">
              <label htmlFor="avatar" className="font-medium text-sm leading-[1.05rem]">
                ატვირთეთ ფოტო *
              </label>
              <div
                className={`relative mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-dashed border-darkGrey ${
                  agentErrors.avatar
                    ? 'border-redPrimary'
                    : isAgentSubmitted
                    ? 'border-greenPrimary'
                    : 'border-black'
                } rounded-md overflow-hidden`}
              >
                <input
                  type="file"
                  id="avatar"
                  className="absolute -top-5 left-0 w-full h-[calc(100%+20px)]"
                  {...registerAgent('avatar', {
                    required: true,
                  })}
                  onChange={handleAgentFileChange}
                />
                <label htmlFor="avatar">
                  <svg
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 8V16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 12H16" stroke="#2D3648" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </svg>
                </label>
                {isAgentPreviewVisible && (
                  <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img
                      id="avatar-preview"
                      src={agentImagePreview || ''}
                      alt="Agent Preview"
                      className="max-h-[82px] rounded-[4px]"
                    />
                    <svg
                      id="delete-preview"
                      onClick={handleAgentDelete}
                      className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 cursor-pointer"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="12" cy="12" r="11.5" fill="white" stroke="#021526"/>
                        <path d="M6.75 8.5H7.91667H17.25" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.0834 8.50033V16.667C16.0834 16.9764 15.9605 17.2732 15.7417 17.492C15.5229 17.7107 15.2262 17.8337 14.9167 17.8337H9.08341C8.774 17.8337 8.47725 17.7107 8.25846 17.492C8.03966 17.2732 7.91675 16.9764 7.91675 16.667V8.50033M9.66675 8.50033V7.33366C9.66675 7.02424 9.78966 6.72749 10.0085 6.5087C10.2272 6.28991 10.524 6.16699 10.8334 6.16699H13.1667C13.4762 6.16699 13.7729 6.28991 13.9917 6.5087C14.2105 6.72749 14.3334 7.02424 14.3334 7.33366V8.50033" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.8333 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.1667 11.417V14.917" stroke="#021526" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
                {imageError && <p className="text-redPrimary text-sm">{imageError}</p>}
            </div>

            {/* buttons */}
            <div className="mt-[94px] w-full flex justify-end items-center gap-[15px]">
              <ButtonSecondary text="გაუქმება" onClick={onClose} />
              <ButtonPrimary text="დამატება" type="submit" />
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AgentModal;
