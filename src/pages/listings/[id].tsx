import Styling from './listingPage.module.css'
import Head from 'next/head'
import { Meta, NavigationBar, Map, Loading, Button, ButtonSecondary } from '../../components'
import { Listing, Session, User } from '../../types'
import { deleteListing, fetchListingById, fetchUserById } from '../../api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { AxiosError } from 'axios'

export default function ListingPage() {
  const { data } = useSession()
  const session: Session = data
  const [listing, setListing] = useState<Listing>(null)
  const [leaser, setLeaser] = useState<User>(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id && !listing) {
      fetchListingById(id.toString())
        .then(setListing)
        .catch((ex: AxiosError) => {
          console.log(ex)
          router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.response?.data?.status)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (listing && !leaser) {
      fetchUserById(listing.leaser)
        .then(setLeaser)
        .catch((ex: AxiosError) => {
          router.push('/error?msg=' + ex?.response?.data?.message + '&code=' + ex?.code)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listing])

  const showLeasePage = async () => {
    router.push('/lease?id=' + listing.id)
  }

  const deleteAd = async () => {
    await deleteListing(listing.id, session.sessionToken)
    router.push('/')
  }

  const displayFallbackImage = (event) => {
    event.target.src = '/noimage.svg'
  }

  return (
    <>
      <Head>
        <title>{listing?.name} | Rently.io</title>
      </Head>

      <main>
        <Meta />
        <NavigationBar />

        {listing ? (
          <>
            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <div className={Styling.descArea}>
                  <img className={Styling.image} src={listing.image} onError={(event) => displayFallbackImage(event)} />

                  <div>
                    <p className={Styling.title}>{listing.name}</p>
                    <div className={Styling.details}>
                      <b>Daily price </b>
                      {listing.price}€<b>Available since </b>
                      {new Date(parseInt(listing.createdAt) * 1000).toLocaleString()}
                      <b>Rental start</b>
                      {new Date(parseInt(listing.startDate) * 1000).toLocaleDateString()}
                      <b>Rental end</b>
                      {new Date(parseInt(listing.endDate) * 1000).toLocaleDateString()}
                    </div>

                    <p className={Styling.description}>{listing.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>About the leaser</h2>
                {session?.user ? (
                  <>
                    <p>
                      <b>Name</b> &nbsp; {leaser?.name}
                    </p>
                    {listing?.phone && (
                      <p>
                        <b>Phone</b> &nbsp; {listing.phone}
                      </p>
                    )}
                  </>
                ) : (
                  <p>
                    You need to be logged in to see this leaser's contact information. &nbsp;
                    <a href="/login">
                      <b>
                        <u>Sign in here</u>
                      </b>
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className={Styling.container}>
              <div className={Styling.innerContainer}>
                <h2>Where can I find this</h2>
                {session?.user ? (
                  <>
                    <p>{listing.address.formattedAddress}</p>
                    <Map lat={listing.address.location.coordinates[1]} lon={listing.address.location.coordinates[0]} />
                  </>
                ) : (
                  <>
                    <p>{listing.address.country + ', ' + listing.address.city + '.'}</p>
                    <p>
                      You need to be logged in to see a more precise location. &nbsp;
                      <a href="/login">
                        <b>
                          <u>Sign in here</u>
                        </b>
                      </a>
                    </p>
                  </>
                )}
              </div>
            </div>

            {(session as Session)?.user?.id == listing.leaser ? (
              <div className={Styling.btns}>
                <div onClick={showLeasePage}>
                  <Button text="Change something" width="200px" />
                </div>
                <div onClick={deleteAd}>
                  <ButtonSecondary text="Remove this listing" width="200px" />
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <Loading />
        )}
      </main>
    </>
  )
}
