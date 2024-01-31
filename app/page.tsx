import clientPromise from '../lib/mongodb'
import {NewPropertySubmission} from './ui/components/NewPropertySubmission'

export default async function Page() {
  let isConnected = false

  try {
    await clientPromise
    isConnected = true
  } catch (e) {
    console.error(e)
  }

  return (
    <>

      {!isConnected && (
        <h2 className="subtitle text-danger">There was an error connecting to
          DB!</h2>
      )}

      <NewPropertySubmission />
    </>
  );
}
