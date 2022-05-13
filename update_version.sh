#!/bin/bash

REGEX="beam-wasm-client(\-?([a-z]*))@([0-9]+\.[0-9]+\.[0-9]+)"
OUTPUT=$(npm list | grep beam-wasm-client*)
MANIFEST="src/manifest.json"
REVISION=$(git rev-list HEAD --count)

if [[ $OUTPUT =~ $REGEX ]]; then
	VERSION="0.0.$REVISION"
	BEAM_VERSION="${BASH_REMATCH[3]}"
	echo -n $VERSION > version.gen
	sed "s/%VERSION%/$VERSION/" $MANIFEST.in > $MANIFEST.tmp;
	sed "s/%BEAM_VERSION%/$BEAM_VERSION/" $MANIFEST.tmp > $MANIFEST.tmp2;
fi

SUFFIX=${BASH_REMATCH[1]}
NETWORK=${BASH_REMATCH[2]}
echo -n $SUFFIX > suffix.gen

if [[ $NETWORK != '' ]]; then
	NETWORK=" ($NETWORK)"
fi

sed "s/%BEAM_NETWORK%/$NETWORK/" $MANIFEST.tmp2 > $MANIFEST;

rm $MANIFEST.tmp2
rm $MANIFEST.tmp