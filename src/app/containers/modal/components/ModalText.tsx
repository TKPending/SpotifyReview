const ModalText = () => {
  return (
    <div className="h-full text-center flex flex-col items-center justify-center gap-12">
      <p className="text-2xl">Are you sure you want to remove access?</p>

      <p className="text-base text-black">
        Removing access, will remove your data from session storage and you'll
        have to <span className="text-white"> re-authorise</span> to gain access
        to your review
      </p>
    </div>
  );
};

export default ModalText;
