if [ -z $VITE_HOST ]; then
  echo "VITE_HOST is not set"
  exit 1
elif [ -z $VITE_SOCIALS ]; then
  echo "VITE_SOCIALS is not set"
  exit 1
fi

yarn build
mv dist "$VITE_HOST"
ipfs add -r "./$VITE_HOST"
