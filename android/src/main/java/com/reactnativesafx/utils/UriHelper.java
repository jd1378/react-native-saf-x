package com.reactnativesafx.utils;

import android.net.Uri;
import android.os.Build.VERSION_CODES;
import androidx.annotation.RequiresApi;

@RequiresApi(api = VERSION_CODES.Q)
public class UriHelper {
  public static final String CONTENT_URI_PREFIX = "content://";

  public static String getLastSegment(String uriString) {

    return Uri.parse(Uri.decode(uriString)).getLastPathSegment();
  }
}
