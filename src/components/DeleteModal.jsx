import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';
import React, { Fragment, useRef, useContext } from 'react';
import { CommentsContext } from '../context';

const DeleteModal = (props) => {
  const { comments, setComments } = useContext(CommentsContext);
  const handleDelete = () => {
    const newComments = comments.map((comment) => {
      if (comment.id !== props.commentId) {
        return comment;
      }
    });

    props.setOpen(false);
    setComments(newComments.filter((comment) => comment !== undefined));
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <div id="delete-modal">
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={props.setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"> */}
                        {/* <ExclamationIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        /> */}
                      {/* </div> */}
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Delete comment
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this comment? This will remove the comment and
                            can't be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center">
                    <button
                      type="button"
                      className="uppercase w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#ED6368] text-base font-medium text-white hover:bg-[#FFB8BB] focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleDelete}
                      id="confirm-delete-button"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      className="uppercase mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#67727E] text-base font-medium text-white hover:bg-[#E9EBF0] focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setOpen(false)}
                      ref={cancelButtonRef}
                      id="cancel-button"
                    >
                      No, Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </div>
    </Transition.Root>
  );
};

export default DeleteModal;
