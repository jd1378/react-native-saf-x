package com.reactnativesafx.utils;

import android.content.ContentResolver;
import android.net.Uri;
import android.os.Build;
import android.provider.DocumentsContract;

import androidx.annotation.RequiresApi;

@RequiresApi(api = Build.VERSION_CODES.N)
public class UriHelper {
  public static String getLastSegment(String uriString) {

    return Uri.parse(Uri.decode(uriString)).getLastPathSegment();
  }

  public static String normalize(String uriString) {
    if (DocumentsContract.isTreeUri(Uri.parse(uriString))) {
      // an abnormal uri example:
      // content://com.android.externalstorage.documents/tree/1707-3F0B%3Ajoplin/locks/2_2_fa4f9801e9a545a58f1a6c5d3a7cfded.json
      // normalized:
      // content://com.android.externalstorage.documents/tree/1707-3F0B%3Ajoplin%2Flocks%2F2_2_fa4f9801e9a545a58f1a6c5d3a7cfded.json

      // uri parts:
      String[] parts = Uri.decode(uriString).split(":");
      return parts[0] + ":" + parts[1] + Uri.encode(":" + parts[2]);
    }
    return uriString;
  }

  public static Uri getUnifiedUri(String unknownUriStr) {
    if (unknownUriStr == null || unknownUriStr.equals("")) {
      throw new IllegalArgumentException("Invalid Uri: No input was given");
    }
    Uri uri = Uri.parse(unknownUriStr);
    if (uri.getScheme() == null) {
      uri = Uri.parse(ContentResolver.SCHEME_FILE + "://" + unknownUriStr);
    } else if (!(uri.getScheme().equals(ContentResolver.SCHEME_FILE)
      || uri.getScheme().equals(ContentResolver.SCHEME_CONTENT))) {
      throw new IllegalArgumentException("Invalid Uri: Scheme not supported");
    }
    return uri;
  }
}
